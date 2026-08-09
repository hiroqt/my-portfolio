'use client'

import { useRef, useState, useCallback, useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'
import { inquiryFormSchema, type InquiryFormValues } from '@/schemas/inquiry'

// ─── Types ────────────────────────────────────────────────────────────────────

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  'Web Application',
  'Mobile App',
  'E-commerce',
  'AI / Automation',
  'Landing Page',
  'Dashboard / Admin',
  'API / Backend',
  'Other',
]

const BUDGET_OPTIONS = [
  'Under ₱20,000',
  '₱20,000 – ₱50,000',
  '₱50,000 – ₱100,000',
  '₱100,000 – ₱200,000',
  '₱200,000+',
  "Let's discuss",
]

const MESSAGE_MAX = 5000

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Base classes shared by all text inputs, selects, and the textarea. */
function inputCls(hasError: boolean) {
  return [
    'w-full bg-background text-foreground text-sm placeholder:text-muted-foreground/50',
    'border rounded-xl px-4 py-3',
    'outline-none transition-colors duration-200',
    // Keyboard-only focus ring — keeps the UI clean on mouse/touch
    'focus-visible:ring-2 focus-visible:ring-offset-0',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    hasError
      ? 'border-red-500/60 focus-visible:ring-red-500/30 dark:border-red-400/60 dark:focus-visible:ring-red-400/30'
      : 'border-border focus-visible:ring-foreground/25 focus-visible:border-foreground/40 hover:border-foreground/30',
  ].join(' ')
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string
  label: string
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5"
    >
      {label}
      {required && (
        <span className="text-foreground ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null
  return (
    <motion.p
      id={id}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="mt-1.5 text-[11px] font-mono text-red-500 dark:text-red-400"
      role="alert"
    >
      {message}
    </motion.p>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

if (!TURNSTILE_SITE_KEY) {
  console.error(
    '[InquiryForm] NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set. ' +
      'Add it to your .env.local file. The human-verification widget will not work.',
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InquiryForm() {
  const formId = useId()
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  // Hard lock: prevents any duplicate in-flight submissions regardless of click speed
  const submittingRef = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      message: '',
      turnstileToken: '',
    },
  })

  const messageValue = watch('message') ?? ''

  // Turnstile callbacks
  const handleTurnstileSuccess = useCallback(
    (token: string) => setValue('turnstileToken', token, { shouldValidate: true }),
    [setValue],
  )
  const handleTurnstileError = useCallback(
    () => setValue('turnstileToken', '', { shouldValidate: false }),
    [setValue],
  )

  const onSubmit = async (data: InquiryFormValues) => {
    if (submittingRef.current) return
    submittingRef.current = true
    setStatus('submitting')
    setServerError(null)

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await response.json()

      if (response.ok && json.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
        setServerError(
          json.message ??
            "Sorry, we couldn't send your inquiry right now. Please try again in a moment.",
        )
      }
    } catch {
      setStatus('error')
      setServerError(
        "Sorry, we couldn't send your inquiry right now. Please try again in a moment.",
      )
    } finally {
      submittingRef.current = false
    }
  }

  const isSubmitting = status === 'submitting'

  // ── Success state ─────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <motion.div
        key="success"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="gemini-card p-10 sm:p-12 flex flex-col items-center text-center gap-6"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-foreground"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <div className="space-y-1.5">
          <h3 className="text-base font-display font-semibold tracking-wide">Inquiry received</h3>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Thanks! Your inquiry has been received. I&apos;ll get back to you soon.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setServerError(null)
            setStatus('idle')
          }}
          className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
        >
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  // ── Form state ────────────────────────────────────────────────────────────

  return (
    <motion.form
      key="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Freelance inquiry form"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* ── Row 1 — Name + Email ───────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <FieldLabel htmlFor={`${formId}-name`} label="Name" required />
          <input
            id={`${formId}-name`}
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            {...register('name')}
            className={inputCls(!!errors.name)}
          />
          <AnimatePresence mode="wait">
            {errors.name && (
              <FieldError id={`${formId}-name-err`} message={errors.name.message} />
            )}
          </AnimatePresence>
        </div>

        {/* Email */}
        <div>
          <FieldLabel htmlFor={`${formId}-email`} label="Email" required />
          <input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            {...register('email')}
            className={inputCls(!!errors.email)}
          />
          <AnimatePresence mode="wait">
            {errors.email && (
              <FieldError id={`${formId}-email-err`} message={errors.email.message} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Row 2 — Phone + Company ───────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <FieldLabel htmlFor={`${formId}-phone`} label="Phone" />
          <input
            id={`${formId}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="+639XXXXXXXXX"
            disabled={isSubmitting}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
            {...register('phone')}
            className={inputCls(!!errors.phone)}
          />
          <AnimatePresence mode="wait">
            {errors.phone && (
              <FieldError id={`${formId}-phone-err`} message={errors.phone.message} />
            )}
          </AnimatePresence>
        </div>

        {/* Company */}
        <div>
          <FieldLabel htmlFor={`${formId}-company`} label="Company" />
          <input
            id={`${formId}-company`}
            type="text"
            autoComplete="organization"
            placeholder="ABC Company"
            disabled={isSubmitting}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${formId}-company-err` : undefined}
            {...register('company')}
            className={inputCls(!!errors.company)}
          />
          <AnimatePresence mode="wait">
            {errors.company && (
              <FieldError id={`${formId}-company-err`} message={errors.company.message} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Row 3 — Project Type + Budget (selects with custom chevron) ── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Project Type */}
        <div>
          <FieldLabel htmlFor={`${formId}-projectType`} label="Project Type" />
          {/* Wrapper provides the custom dropdown chevron */}
          <div className="relative">
            <select
              id={`${formId}-projectType`}
              disabled={isSubmitting}
              aria-invalid={!!errors.projectType}
              aria-describedby={errors.projectType ? `${formId}-projectType-err` : undefined}
              {...register('projectType')}
              className={[inputCls(!!errors.projectType), 'appearance-none pr-10 cursor-pointer'].join(' ')}
            >
              <option value="" className="bg-background text-muted-foreground">Select a type…</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-background text-foreground">
                  {t}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-muted-foreground" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </span>
          </div>
          <AnimatePresence mode="wait">
            {errors.projectType && (
              <FieldError id={`${formId}-projectType-err`} message={errors.projectType.message} />
            )}
          </AnimatePresence>
        </div>

        {/* Budget */}
        <div>
          <FieldLabel htmlFor={`${formId}-budget`} label="Budget" />
          <div className="relative">
            <select
              id={`${formId}-budget`}
              disabled={isSubmitting}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? `${formId}-budget-err` : undefined}
              {...register('budget')}
              className={[inputCls(!!errors.budget), 'appearance-none pr-10 cursor-pointer'].join(' ')}
            >
              <option value="" className="bg-background text-muted-foreground">Select a budget…</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b} className="bg-background text-foreground">
                  {b}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-muted-foreground" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <polyline points="4 6 8 10 12 6" />
              </svg>
            </span>
          </div>
          <AnimatePresence mode="wait">
            {errors.budget && (
              <FieldError id={`${formId}-budget-err`} message={errors.budget.message} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Row 4 — Message ───────────────────────────────────────────── */}
      <div>
        <div className="flex items-baseline justify-between mb-1.5">
          <FieldLabel htmlFor={`${formId}-message`} label="Message" required />
          {/* Live character counter */}
          <span
            className={[
              'text-[10px] font-mono tabular-nums transition-colors',
              messageValue.length > MESSAGE_MAX * 0.9
                ? 'text-red-500 dark:text-red-400'
                : 'text-muted-foreground/50',
            ].join(' ')}
            aria-live="polite"
            aria-atomic="true"
          >
            {messageValue.length} / {MESSAGE_MAX.toLocaleString()}
          </span>
        </div>
        <textarea
          id={`${formId}-message`}
          rows={5}
          placeholder="Tell me about your project — what you need, your timeline, any specifics…"
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${formId}-message-err` : undefined}
          {...register('message')}
          className={[inputCls(!!errors.message), 'resize-y min-h-[120px]'].join(' ')}
        />
        <AnimatePresence mode="wait">
          {errors.message && (
            <FieldError id={`${formId}-message-err`} message={errors.message.message} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Row 5 — Turnstile captcha ─────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-2">
          Human verification
        </p>
        {TURNSTILE_SITE_KEY ? (
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
            onExpire={handleTurnstileError}
            options={{ theme: 'auto', size: 'normal' }}
          />
        ) : (
          <p className="text-xs text-red-500 font-mono">
            Verification widget unavailable — NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured.
          </p>
        )}
        <AnimatePresence mode="wait">
          {errors.turnstileToken && (
            <FieldError message={errors.turnstileToken.message} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Server-level error banner ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {status === 'error' && serverError && (
          <motion.div
            key="server-error"
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-red-500/25 bg-red-500/5 text-sm text-red-600 dark:text-red-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mt-0.5 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit row ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className={[
            'group relative inline-flex items-center justify-center gap-2.5',
            'w-full sm:w-auto sm:min-w-[180px] px-8 py-3.5 rounded-xl',
            'text-sm font-mono uppercase tracking-[0.15em]',
            'border border-foreground bg-foreground text-background',
            'transition-all duration-200',
            'hover:bg-background hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground disabled:hover:text-background',
          ].join(' ')}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSubmitting ? (
              <motion.span
                key="sending"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2"
              >
                <svg
                  className="animate-spin h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2"
              >
                Send inquiry
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="text-[10px] font-mono text-muted-foreground/50">
          * Required fields
        </p>
      </div>
    </motion.form>
  )
}
