export interface ProgressStepProps extends React.ComponentPropsWithRef<'li'> {
  /**
   * The current status of the step
   */
  status: 'complete' | 'active' | 'incomplete';
  /**
   * The label text to display for the step
   */
  label: string;
}

type ButtonElementProps = React.ComponentPropsWithRef<'button'>;
export interface ProgressStepButtonProps
  extends ButtonElementProps,
    Omit<ProgressStepProps, keyof ButtonElementProps> {}

type LinkElementProps = React.ComponentPropsWithRef<'a'>;
export interface ProgressStepLinkProps
  extends LinkElementProps,
    Omit<ProgressStepProps, keyof LinkElementProps>,
    Pick<ButtonElementProps, 'disabled'> {}
