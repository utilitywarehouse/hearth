export interface ProgressStepProps extends React.ComponentPropsWithRef<'li'> {
  /**
   * The current status of the step
   */
  status: 'complete' | 'active' | 'incomplete';
}
