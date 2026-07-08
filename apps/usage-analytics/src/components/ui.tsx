import type { ReactNode } from 'react';
import { BodyText, Box, Flex, Heading } from '@utilitywarehouse/hearth-react';

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <Flex className="page-header">
      <Box className="page-header__text">
        <Heading as="h1" className="page-header__title">
          {title}
        </Heading>
        {subtitle ? (
          <BodyText as="p" className="page-header__subtitle">
            {subtitle}
          </BodyText>
        ) : null}
      </Box>
      {actions ? <Box>{actions}</Box> : null}
    </Flex>
  );
}

export function Section({ title, aside, children }: { title?: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="section">
      {title ? (
        <Flex className="section__head">
          <Heading as="h2" className="section__title">
            {title}
          </Heading>
          {aside}
        </Flex>
      ) : null}
      {children}
    </section>
  );
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <Flex className="state state--loading" aria-busy="true">
      <span className="spinner" />
      <BodyText as="span">{label}</BodyText>
    </Flex>
  );
}

export function ErrorBox({ error }: { error: string }) {
  return (
    <Box className="state state--error" role="alert">
      <BodyText as="p">Couldn’t load data: {error}</BodyText>
      <BodyText as="p" className="muted">
        The dashboard reads static JSON from <code>data/</code>. Run{' '}
        <code>pnpm --filter usage-analytics gen:sample</code> or the collector, then reload.
      </BodyText>
    </Box>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <Box className="state state--empty">
      <BodyText as="p">{children}</BodyText>
    </Box>
  );
}
