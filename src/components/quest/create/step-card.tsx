import type { JSX, PropsWithChildren } from 'react';
import { Card, CardContent } from '../../ui/card';
import { StepsProgress } from '../../ui/steps-progress';
import { Button } from '../../ui/button';

type CreateQuestStepCardProps = PropsWithChildren<{
  title: string;
  description: string;
  currentStep: number;
  onNextClick?: () => void;
  onBackClick?: () => void;
  submit?: JSX.Element;
  disabled?: boolean;
}>;

export function CreateQuestStepCard({
  title,
  description,
  currentStep,
  children,
  onBackClick,
  onNextClick,
  submit,
  disabled,
}: CreateQuestStepCardProps): JSX.Element {
  return (
    <Card className="mx-auto max-w-156">
      <CardContent className="flex flex-col gap-8 p-4 pt-4 md:p-8 md:pt-8">
        <StepsProgress steps={3} current={currentStep} />
        <div className="flex flex-col gap-3">
          <p className="text-[32px]/10.5 font-bold">{title}</p>
          <p>{description}</p>
        </div>
        {children}
        <div className="flex items-end justify-between">
          <p className="text-neutral-secondary text-sm">
            Step {currentStep} short description here
          </p>
          <div className="flex gap-4">
            <Button
              disabled={disabled}
              onClick={onBackClick}
              variant="secondary"
              type="button"
            >
              Back
            </Button>
            {submit ?? (
              <Button type="button" disabled={disabled} onClick={onNextClick}>
                Next Step
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
