import { Panel } from "@jpmorganchase/uitk-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AllRenderer } from "docs/components";

export default {
  title: "Core/Panel",
  component: Panel,
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

export const MediumEmphasis = Template.bind({});
MediumEmphasis.args = {
  children: "Lorem Ipsum",
  className: "uitkEmphasisMedium",
};

export const HighEmphasis = Template.bind({});
HighEmphasis.args = {
  children: "Lorem Ipsum",
  className: "uitkEmphasisHigh",
};

export const All: ComponentStory<typeof Panel> = (props) => {
  return (
    <>
      <h1>Medium emphasis</h1>
      <AllRenderer>
        <Panel {...props} />
      </AllRenderer>
      <h1>High emphasis</h1>
      <AllRenderer>
        <Panel className="uitkEmphasisHigh" {...props} />
      </AllRenderer>
    </>
  );
};
All.args = {
  children: <p>Lorem Ipsum</p>,
};
