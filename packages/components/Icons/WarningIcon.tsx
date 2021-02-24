import * as React from 'react';

interface WarningIconProps {
    size?: string;
}

export function WarningIcon({ size = '30' }: WarningIconProps) {
    return (
        <svg viewBox="0 0 100 100" width={`${size}px`}>
            <path d="M50 0 L55 60 L70 60 L75 0 " stroke="orange" fill="orange" />
            <circle cx="62" cy="80" r="10" stroke-width="3" fill="orange" />
        </svg>
    )
};
