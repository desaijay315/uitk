import {
  BorderItem,
  BorderLayout,
  Button,
  Pill,
  SplitLayout,
  Switch,
} from "@jpmorganchase/uitk-core";
import {
  ChevronLeftIcon,
  MessageIcon,
  NotificationIcon,
  SettingsIcon,
} from "@jpmorganchase/uitk-icons";
import {
  AppHeader,
  Badge,
  ButtonBar,
  OrderedButton,
  Tab,
  Tabstrip,
  Tooltray,
} from "@jpmorganchase/uitk-lab";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import cx from "classnames";
import { ChangeEvent, useState } from "react";
import { FlexLayoutComposite } from "./flex-layout.stories";
import {
  FlowLayoutComposite,
  FlowLayoutSimpleUsage,
} from "./flow-layout.stories";
import { SplitLayoutSimpleUsage } from "./split-layout.stories";

export default {
  title: "Core/Layout/BorderLayout",
  component: BorderLayout,
  subcomponents: { BorderItem },
  argTypes: {
    gap: {
      type: "number",
    },
    columnGap: {
      type: "number",
    },
    rowGap: {
      type: "number",
    },
  },
} as ComponentMeta<typeof BorderLayout>;

type ItemProps = { width?: number | string; height?: number | string };

const HeaderItem = ({ width, height }: ItemProps) => (
  <div className="border-item border-header" style={{ width, height }}>
    <p>Header</p>
  </div>
);

const LeftItem = ({ width, height }: ItemProps) => (
  <div className="border-item border-left" style={{ width, height }}>
    <p>Left</p>
  </div>
);

const MainItem = ({ width, height }: ItemProps) => (
  <div
    className="border-item border-main"
    style={{
      minWidth: 100,
      width,
      height,
    }}
  >
    <p>Main</p>
  </div>
);

const RightItem = ({ width, height }: ItemProps) => (
  <div className="border-item border-right" style={{ width, height }}>
    <p>Right</p>
  </div>
);

const BottomItem = ({ width, height }: ItemProps) => (
  <div className="border-item border-bottom" style={{ width, height }}>
    <p>Bottom</p>
  </div>
);

const Template: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args}>
      <BorderItem position="header">
        <HeaderItem />
      </BorderItem>
      <BorderItem position="left">
        <LeftItem />
      </BorderItem>
      <BorderItem position="main">
        <MainItem />
      </BorderItem>
      <BorderItem position="right">
        <RightItem />
      </BorderItem>
      <BorderItem position="bottom">
        <BottomItem />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutAllPanels = Template.bind({});
BorderLayoutAllPanels.args = {};

const NoRightPanel: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args}>
      <BorderItem position="header">
        <HeaderItem />
      </BorderItem>
      <BorderItem position="left">
        <LeftItem />
      </BorderItem>
      <BorderItem position="main">
        <MainItem />
      </BorderItem>
      <BorderItem position="bottom">
        <BottomItem />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutNoRightPanel = NoRightPanel.bind({});
BorderLayoutNoRightPanel.args = {};

const NoLeftPanel: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args}>
      <BorderItem position="header">
        <HeaderItem />
      </BorderItem>
      <BorderItem position="main">
        <MainItem />
      </BorderItem>
      <BorderItem position="right">
        <RightItem />
      </BorderItem>
      <BorderItem position="bottom">
        <BottomItem />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutNoLeftPanel = NoLeftPanel.bind({});
BorderLayoutNoLeftPanel.args = {};

const NoHeader: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args}>
      <BorderItem position="left">
        <LeftItem />
      </BorderItem>
      <BorderItem position="main">
        <MainItem />
      </BorderItem>
      <BorderItem position="right">
        <RightItem />
      </BorderItem>
      <BorderItem position="bottom">
        <BottomItem />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutNoHeader = NoHeader.bind({});
BorderLayoutNoHeader.args = {};

const FixedPanels: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args} style={{ width: "60vw" }}>
      <BorderItem position="header">
        <HeaderItem height={50} />
      </BorderItem>
      <BorderItem position="left">
        <LeftItem width={100} height={200} />
      </BorderItem>
      <BorderItem position="main">
        <MainItem height="100%" />
      </BorderItem>
      <BorderItem position="right">
        <RightItem width={100} height={200} />
      </BorderItem>
      <BorderItem position="bottom">
        <BottomItem height={50} />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutFixedPanels = FixedPanels.bind({});
BorderLayoutFixedPanels.args = {};

const Header = () => {
  const tabs = ["Home", "Transactions", "FX", "Checks", "Loans"];
  return (
    <>
      <AppHeader>
        <strong>LOGO</strong>
        <Tabstrip data-index={1} data-priority={2}>
          {tabs.map((label, i) => (
            <Tab label={label} key={i} />
          ))}
        </Tabstrip>
        <Tooltray
          data-collapsible="dynamic"
          data-index={2}
          data-priority={1}
          data-align-end
          data-reclaim-space
        >
          <Button variant="secondary">
            <Badge badgeContent={50}>
              <MessageIcon />
            </Badge>
          </Button>
          <Button variant="secondary">
            <NotificationIcon />
          </Button>
          <Button variant="secondary">
            <SettingsIcon />
          </Button>
        </Tooltray>
      </AppHeader>
    </>
  );
};

const TwoColumnFormPage: ComponentStory<typeof BorderLayout> = (args) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (
    _: ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    setChecked(isChecked);
  };

  const BackButton = () => (
    <Button variant="secondary">
      <ChevronLeftIcon size="small" style={{ marginRight: 4 }} />
      Back to manage view
    </Button>
  );

  const StylesToggle = () => (
    <Switch
      checked={checked}
      onChange={handleChange}
      label={`Custom styles ${checked ? "on" : "off"}`}
    />
  );

  return (
    <BorderLayout {...args}>
      <BorderItem
        position="header"
        sticky
        className="border-layout-form-header"
      >
        <Header />
        <SplitLayout
          leftSplitItem={<BackButton />}
          rightSplitItem={<StylesToggle />}
          className="border-layout-button-container"
        />

        <div className="uitkEmphasisHigh border-layout-form-steps">
          <SplitLayout
            leftSplitItem={<FlowLayoutSimpleUsage />}
            rightSplitItem={
              <Pill label="In progress" className="border-layout-pill" />
            }
          />
        </div>
      </BorderItem>

      <BorderItem position="main">
        <div
          className={cx({
            "border-layout-custom-form": checked,
          })}
        >
          <FlowLayoutComposite separators />
        </div>
      </BorderItem>

      <BorderItem
        position="bottom"
        sticky
        className="border-layout-form-footer"
      >
        <SplitLayoutSimpleUsage leftSplitItem={{}} rightSplitItem={{}} />
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutFormComposite = TwoColumnFormPage.bind({});
BorderLayoutFormComposite.args = {};

const Contacts: ComponentStory<typeof BorderLayout> = (args) => {
  return (
    <BorderLayout {...args}>
      <BorderItem position="header" className="border-layout-form-header">
        <Header />
      </BorderItem>

      <BorderItem position="main">
        <div className="border-layout-contacts">
          <h2>My contacts</h2>
          <FlexLayoutComposite wrap />
        </div>
      </BorderItem>

      <BorderItem position="bottom" className="border-layout-contacts-footer">
        <ButtonBar>
          <OrderedButton variant="cta">Edit</OrderedButton>
          <OrderedButton>Cancel</OrderedButton>
        </ButtonBar>
      </BorderItem>
    </BorderLayout>
  );
};

export const BorderLayoutContactsComposite = Contacts.bind({});
BorderLayoutContactsComposite.args = {};
