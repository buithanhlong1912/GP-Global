'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';
import { Container } from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gray' | 'dark' | 'interior' | 'staffing';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withContainer?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'lg',
      containerSize = 'lg',
      withContainer = true,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: 'bg-white',
      gray: 'bg-gray-50',
      dark: 'bg-gray-900 text-white',
      interior: 'bg-gradient-to-br from-[#1a365d] to-[#2b4c7e] text-white',
      staffing: 'bg-gradient-to-br from-[#065f46] to-[#047857] text-white',
    };

    const paddings = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-20',
      xl: 'py-20 md:py-28',
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        {withContainer ? (
          <Container size={containerSize}>{children}</Container>
        ) : (
          children
        )}
      </section>
    );
  },
);

Section.displayName = 'Section';

// Section Header Component
export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      align = 'center',
      titleClassName,
      ...props
    },
    ref,
  ) => {
    const alignments = {
      left: 'text-left',
      center: 'text-center mx-auto',
      right: 'text-right ml-auto',
    };

    return (
      <div
        ref={ref}
        className={cn('max-w-full mb-12', alignments[align], className)}
        {...props}
      >
        {subtitle && (
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-[#c9a962] mb-2">
            {subtitle}
          </span>
        )}
        <h2
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold font-heading',
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-white leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  },
);

SectionHeader.displayName = 'SectionHeader';

export { Section, SectionHeader };
