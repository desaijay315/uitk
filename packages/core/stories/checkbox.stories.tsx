import { ChangeEvent, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "@jpmorganchase/uitk-core";

export default {
  title: "Core/Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const CheckboxTemplate: ComponentStory<typeof Checkbox> = (args) => {
  return <Checkbox {...args} />;
};

export const FeatureInput = CheckboxTemplate.bind({});

FeatureInput.args = {
  label: "Checkbox",
};

export const Default: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox label="I understand ADA required Labels on unchecked checkboxes" />
      <Checkbox
        defaultChecked
        label="I understand ADA required Labels on checked checkboxes"
      />
      <Checkbox
        defaultChecked
        indeterminate
        label="I understand ADA required Labels on indeterminate checkboxes"
      />
    </>
  );
};

export const Disabled: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox disabled label="disabled checkbox" />
      <Checkbox
        disabled
        indeterminate
        label="disabled indeterminate checkbox"
      />
      <Checkbox disabled checked label="disabled and checked checkbox" />
    </>
  );
};

export const WithoutLabel = CheckboxTemplate.bind({});

WithoutLabel.args = { defaultChecked: true };

export const Indeterminate: ComponentStory<typeof Checkbox> = () => {
  const [checkboxState, setCheckboxState] = useState({
    checked: false,
    indeterminate: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = event.target.checked;
    setCheckboxState({
      indeterminate: !updatedChecked && checkboxState.checked,
      checked:
        checkboxState.indeterminate && updatedChecked ? false : updatedChecked,
    });
  };

  return (
    <Checkbox
      checked={checkboxState.checked}
      indeterminate={checkboxState.indeterminate}
      label="Indeterminate checkbox"
      onChange={handleChange}
    />
  );
};

export const HorizontalGroup: ComponentStory<typeof Checkbox> = () => {
  return (
    <CheckboxGroup row>
      <Checkbox defaultChecked label="option 1" value="option-1" />
      <Checkbox defaultChecked label="option 2" value="option-2" />
      <Checkbox label="option 3" value="option-3" />
    </CheckboxGroup>
  );
};

export const UncontrolledGroup: ComponentStory<typeof CheckboxGroup> = (
  args
) => {
  return (
    <CheckboxGroup {...args}>
      <Checkbox defaultChecked label="option 1" value="option-1" />
      <Checkbox defaultChecked label="option 2" value="option-2" />
      <Checkbox label="option 3" value="option-3" />
    </CheckboxGroup>
  );
};

UncontrolledGroup.args = {
  legend: "Uncontrolled CheckboxGroup",
};

export const ControlledGroup: ComponentStory<typeof CheckboxGroup> = (args) => {
  const checkboxesData = [
    {
      label: "Spot",
      value: "spot",
    },
    {
      label: "Forward",
      value: "forward",
    },
    {
      disabled: true,
      label: "Option (disabled)",
      value: "option",
    },
  ];

  const [controlledValues, setControlledValues] = useState(["forward"]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (controlledValues.indexOf(value) === -1) {
      setControlledValues((prevControlledValues) => [
        ...prevControlledValues,
        value,
      ]);
    } else {
      setControlledValues((prevControlledValues) =>
        prevControlledValues.filter(
          (controlledValue) => controlledValue !== value
        )
      );
    }
  };
  return (
    <CheckboxGroup
      {...args}
      checkedValues={controlledValues}
      legend="Controlled Checkbox Group"
      onChange={handleChange}
    >
      {checkboxesData.map((data) => (
        <Checkbox key={data.value} {...data} />
      ))}
    </CheckboxGroup>
  );
};

export const LongTextGroup: ComponentStory<typeof CheckboxGroup> = (args) => {
  const checkboxesData = [
    {
      label:
        "Checkboxes allow the user to select multiple options from a set. If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead.",
      value: "checkboxes",
    },
    {
      label:
        "Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side. Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side.",
      value: "radio",
    },
    {
      disabled: true,
      label:
        "On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switch can also be used with a label description thanks to the FormControlLabel component.",
      value: "switches",
    },
  ];

  return (
    <CheckboxGroup
      {...args}
      defaultCheckedValues={["radio"]}
      legend="Long Text Checkbox Group"
    >
      {checkboxesData.map((data) => (
        <Checkbox key={data.value} {...data} />
      ))}
    </CheckboxGroup>
  );
};
