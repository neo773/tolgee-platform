import { QUERY } from 'tg.constants/links';
import { useUrlSearchState } from 'tg.hooks/useUrlSearchState';

export type PrefilterType = {
  activity?: number;
  failedJob?: number;
  task?: number;
  taskFilterNotDone?: boolean;
  clear: () => void;
};

const stringToNumber = (input: string | undefined) => {
  const asNumber = Number(input);
  if (input !== undefined && !Number.isNaN(asNumber)) {
    return asNumber;
  }
  return undefined;
};

export const usePrefilter = (): PrefilterType => {
  const [activity, setActivity] = useUrlSearchState(
    QUERY.TRANSLATIONS_PREFILTERS_ACTIVITY,
    {
      defaultVal: undefined,
      history: true,
    }
  );
  const [failedJob, setFailedJob] = useUrlSearchState(
    QUERY.TRANSLATIONS_PREFILTERS_FAILED_JOB,
    {
      defaultVal: undefined,
      history: true,
    }
  );
  const [task, setTask] = useUrlSearchState(
    QUERY.TRANSLATIONS_PREFILTERS_TASK,
    {
      defaultVal: undefined,
      history: true,
    }
  );

  const [taskHideDone, setTaskHideDone] = useUrlSearchState(
    QUERY.TRANSLATIONS_PREFILTERS_TASK_HIDE_DONE,
    {
      defaultVal: undefined,
      history: true,
    }
  );

  const activityId = stringToNumber(activity);
  const failedJobId = stringToNumber(failedJob);
  const taskNumber = stringToNumber(task);

  function clear() {
    setActivity(undefined);
    setFailedJob(undefined);
    setTask(undefined);
    setTaskHideDone(undefined);
  }

  const result: PrefilterType = {
    clear,
  };

  if (activityId !== undefined) {
    result.activity = activityId;
  } else if (failedJobId !== undefined) {
    result.failedJob = failedJobId;
  } else if (taskNumber !== undefined) {
    result.task = taskNumber;
    if (taskHideDone !== undefined) {
      result.taskFilterNotDone = taskHideDone === 'true';
    }
  }

  return result;
};
