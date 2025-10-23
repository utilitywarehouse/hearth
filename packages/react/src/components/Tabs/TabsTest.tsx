import { Tabs } from 'radix-ui';
import React from 'react';

export const TabsTest = () => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Tab 2</Tabs.Content>
    </Tabs.Root>
  );
};

export const SecondTest = () => {
  //   This works but I'd rather not have to do this
  const TabsRoot = Tabs.Root as unknown as React.ComponentType<Record<string, unknown>>;
  const TabsList = Tabs.List as unknown as React.ComponentType<Record<string, unknown>>;
  const TabsTrigger = Tabs.Trigger as unknown as React.ComponentType<Record<string, unknown>>;
  const TabsContent = Tabs.Content as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <TabsRoot>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Tab 1</TabsContent>
      <TabsContent value="tab2">Tab 2</TabsContent>
    </TabsRoot>
  );
};
