"use client";

import {
    InputPassword,
    type InputPasswordValueChangeEvent,
} from "@primereact/ui/inputpassword";
import { ProgressBar } from "@primereact/ui/progressbar";
import { Tag } from "@primereact/ui/tag";
import { useT } from "next-i18next/client";
import { useState } from "react";

type StrengthLevel = "weak" | "medium" | "strong" | "very-strong";

interface StrengthInfo {
    label: string;
    percent: number;
    color: string;
    severity: "danger" | "warn" | "info" | "success";
}

const getStrength = (value: string): StrengthLevel | null => {
    if (!value) return null;
    let score = 0;
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^a-zA-Z0-9]/.test(value)) score++;
    if (score <= 1) return "weak";
    else if (score <= 2) return "medium";
    else if (score <= 3) return "strong";
    else return "very-strong";
};

const CustomPassword = ({
    id,
    name,
    className,
    value,
    placeholder,
    required,
    ariaLabel,
}: {
    id: string;
    name: string;
    className?: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    ariaLabel?: string;
}) => {
    const { t } = useT("register");

    const [passwordValue, setPasswordValue] = useState<string>(value);
    const level = getStrength(passwordValue);

    const strengthMap: Record<StrengthLevel, StrengthInfo> = {
        weak: {
            label: t("weak-password"),
            percent: 25,
            color: "var(--p-red-400)",
            severity: "danger",
        },
        medium: {
            label: t("medium-password"),
            percent: 50,
            color: "var(--p-amber-400)",
            severity: "warn",
        },
        strong: {
            label: t("strong-password"),
            percent: 75,
            color: "var(--p-blue-400)",
            severity: "info",
        },
        "very-strong": {
            label: t("very-strong-password"),
            percent: 100,
            color: "var(--p-emerald-400)",
            severity: "success",
        },
    };

    const info = level ? strengthMap[level] : null;

    return (
        <>
            <InputPassword
                pt-root-id={id}
                name={name}
                className={className}
                value={passwordValue}
                onValueChange={(e: InputPasswordValueChangeEvent) =>
                    setPasswordValue(e.value)
                }
                required={required}
                placeholder={placeholder}
                mask
                pt-root-aria-required
                pt-root-aria-label={ariaLabel}
            />
            {info && (
                <div className="p-custom-password-info">
                    <ProgressBar.Root value={info.percent}>
                        <ProgressBar.Track style={{ height: "6px" }}>
                            <ProgressBar.Indicator style={{ backgroundColor: info.color }} />
                        </ProgressBar.Track>
                    </ProgressBar.Root>
                    <div className="p-custom-password-label">
                        <Tag severity={info.severity}>{info.label}</Tag>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomPassword;
