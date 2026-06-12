import { BodyText, Button, Card, Flex, Grid } from '@utilitywarehouse/hearth-react';
import Lottie from 'lottie-react';
import { useCallback, useState } from 'react';

type Asset = { name: string; src: any; path: string };

const pascalToKebab = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

export function AssetsGrid({ assets }: { assets: Asset[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const onDownload = useCallback((name: string, src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${pascalToKebab(name)}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  const onCopyImport = useCallback((name: string, path: string) => {
    navigator.clipboard.writeText(
      `import ${name} from '@utilitywarehouse/hearth-${path.split('.')[1]}-assets/lib/${path}';`
    );
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <Grid
      asChild
      gap="200"
      templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
      className="sb-unstyled"
    >
      <ul role="list">
        {assets.map(asset => (
          <li>
            <Card
              key={asset.name}
              direction="column"
              gap="200"
              alignItems="center"
              justifyContent="center"
            >
              <Flex direction="column" alignItems="center" flex="1" gap="150" padding="200">
                {asset.path.includes('.svg') ? (
                  <img
                    src={asset.src as unknown as string}
                    alt=""
                    style={{ maxWidth: 200, maxHeight: 140 }}
                  />
                ) : asset.path.includes('.json') ? (
                  <Lottie animationData={asset.src} loop={true} />
                ) : null}
                <BodyText as="span" style={{ wordBreak: 'break-all' }}>
                  {copied === asset.name ? 'Copied Import...' : asset.name}
                </BodyText>
              </Flex>
              <Flex
                gap="100"
                paddingBottom="100"
                wrap="wrap"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  size="sm"
                  onClick={() => onDownload(asset.name, asset.src as unknown as string)}
                >
                  Download
                </Button>

                <Button size="sm" onClick={() => onCopyImport(asset.name, asset.path)}>
                  Copy Import
                </Button>
              </Flex>
            </Card>
          </li>
        ))}
      </ul>
    </Grid>
  );
}
