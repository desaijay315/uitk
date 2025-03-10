import { Badge } from "@jpmorganchase/uitk-lab";

import {
  ClockIcon,
  SettingsSolidIcon,
  UserBadgeIcon,
} from "@jpmorganchase/uitk-icons";

import "./badge.stories.css";

import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Lab/Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const AllBadges: ComponentStory<typeof Badge> = () => {
  return (
    <div style={{ display: "inline-block" }}>
      <div>
        <Badge badgeContent={1}>
          <SettingsSolidIcon />
        </Badge>
        <Badge badgeContent={6}>
          <UserBadgeIcon />
        </Badge>
        <Badge badgeContent={8}>
          <ClockIcon />
        </Badge>
        <Badge badgeContent={999} />
      </div>
      <div>
        <Badge badgeContent={1}>Lorem Ipsum</Badge>
        <Badge badgeContent={10}>Lorem Ipsum</Badge>
        <Badge badgeContent={100}>Lorem Ipsum</Badge>
        <Badge badgeContent={2000} className="errorBackwardsCompat">
          Lorem Ipsum
        </Badge>
        <Badge badgeContent={2000} max={99} className="successBackwardsCompat">
          Lorem Ipsum
        </Badge>
      </div>
    </div>
  );
};

const Template: ComponentStory<typeof Badge> = (args) => {
  return <Badge {...args} />;
};

export const DefaultBadge = Template.bind({});

DefaultBadge.args = {
  max: 1000,
  badgeContent: 1,
  children: <SettingsSolidIcon />,
};

export const WordsBadge = Template.bind({});

WordsBadge.args = {
  max: 1000,
  badgeContent: 1,
  children: "Lorem Ipsum",
};
