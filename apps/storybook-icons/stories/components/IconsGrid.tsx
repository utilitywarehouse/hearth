import { useState } from 'react';
import { IconProps, SearchMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { svgIcons } from '../../utils/svg-icons';
import { Box, Flex, BodyText } from '@utilitywarehouse/hearth-react';

interface IconsGridProps extends IconProps {
  icons: Array<typeof SearchMediumIcon>;
  lib: 'react' | 'react-native' | 'svg';
}

export const IconsGrid = ({ icons, lib, ...props }: IconsGridProps) => {
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
  const [copied, setCopied] = useState(false);

  return (
    <Box asChild display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
      <ul role="list">
        {icons.map(icon => {
          const IconComponent = icon;
          return (
            <Box
              key={icon.displayName}
              asChild
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={4}
              borderRadius="4px"
              onClick={() => {
                if (lib === 'svg') {
                  const currentSvgIcon = svgIcons.find(svgi => {
                    const split = svgi.split('/');
                    const name = split[split.length - 1].split('.')[0].replaceAll('-', '');
                    return name === icon.displayName?.toLowerCase();
                  });
                  fetch(currentSvgIcon)
                    .then(svg => svg.text())
                    .then(code => {
                      copyToClipboard(code);
                    });
                } else {
                  copyToClipboard(
                    `import { ${icon.displayName} } from '@utilitywarehouse/${lib}-icons';`
                  );
                }
                setCopied(true);
              }}
            >
              <Flex gap={1} direction="column" align="center">
                <Box height={48} display="flex" alignItems="center">
                  <IconComponent {...props} />
                </Box>
                <BodyText
                  as="span"
                  style={{
                    maxWidth: 180,
                    overflowWrap: 'break-word',
                    textAlign: 'center',
                  }}
                >
                  {icon.displayName}
                </BodyText>
              </Flex>
            </Box>
          );
        })}
      </ul>
    </Box>
  );
};
