import { FC } from 'react';
import { PlanInfoType } from './useCloudPlans';
import { BillingPeriodType } from '../../component/Price/PeriodSwitch';
import { Plan } from '../../component/Plan/Plan';
import { AllFromPlanFeature } from '../../component/Plan/AllFromPlanFeature';
import { PlanAction } from './CloudPlanAction';
import { components } from 'tg.service/billingApiSchema.generated';

export const CloudPlanItem: FC<{
  info: PlanInfoType;
  active: boolean;
  ended: boolean;
  onPeriodChange: (period: BillingPeriodType) => void;
  period: BillingPeriodType;
  activeSubscription: components['schemas']['CloudSubscriptionModel'];
}> = ({
  info: info,
  active,
  ended,
  onPeriodChange,
  period,
  activeSubscription,
}) => {
  const { filteredFeatures, previousPlanName, plan, custom } = info;

  // It would throw an error when cancelling...
  // A trial without renew does not make sense
  const isActiveTrialWithoutRenew =
    active &&
    activeSubscription.status === 'TRIALING' &&
    !activeSubscription.trialRenew;

  const shouldShow = !plan.free && !isActiveTrialWithoutRenew;

  return (
    <Plan
      key={plan.id}
      plan={plan}
      active={active}
      ended={ended}
      onPeriodChange={onPeriodChange}
      period={period}
      filteredFeatures={filteredFeatures}
      featuresMinHeight="155px"
      custom={custom}
      nonCommercial={plan.nonCommercial}
      topFeature={
        previousPlanName && <AllFromPlanFeature planName={previousPlanName} />
      }
      action={
        <PlanAction
          active={active}
          ended={ended}
          custom={custom}
          show={shouldShow}
          organizationHasSomeSubscription={!activeSubscription.plan.free}
          period={period}
          planId={plan.id}
        />
      }
    />
  );
};
