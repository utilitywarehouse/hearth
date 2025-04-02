import { useEffect, useState } from 'react';
import { IconProps, SearchMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import {
  Card,
  BodyText,
  Grid,
  UnstyledIconButton,
  CardAction,
} from '@utilitywarehouse/hearth-react';

interface IconsGridProps extends IconProps {
  icons: Array<typeof SearchMediumIcon>;
}

export const IconsGrid = ({ icons, ...props }: IconsGridProps) => {
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCopied('');
    }, 1000);
  }, [copied]);

  return (
    <Grid
      asChild
      gap="200"
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      className="sb-unstyled"
    >
      <ul role="list">
        {icons.map(icon => {
          const IconComponent = icon;
          return (
            <Card
              key={icon.displayName}
              as="li"
              direction="column"
              gap="200"
              align="center"
              justify="center"
            >
              <CardAction>
                <UnstyledIconButton
                  label={`${icon.displayName}`}
                  onClick={() => {
                    copyToClipboard(`<${icon.displayName} title="" titleId="" />`);
                    setCopied(`${icon.displayName}`);
                  }}
                >
                  <IconComponent {...props} />
                </UnstyledIconButton>
              </CardAction>
              <BodyText as="span">
                {copied === icon.displayName ? 'Icon Copied!' : icon.displayName}
              </BodyText>
            </Card>
          );
        })}
      </ul>
    </Grid>
  );
};
