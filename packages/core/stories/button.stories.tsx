import { Button, ButtonProps } from "@jpmorganchase/uitk-core";
import { SearchIcon } from "@jpmorganchase/uitk-icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Core/Button",
  component: Button,
  // Manually specify onClick action to test Actions panel
  // react-docgen-typescript-loader doesn't support detecting interface extension
  // https://github.com/strothj/react-docgen-typescript-loader/issues/47
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof Button>;

const SingleButtonTemplate: ComponentStory<typeof Button> = (props) => {
  return <Button {...props} />;
};

const ButtonGrid = ({
  className = "",
  label,
  variant,
}: {
  className?: string;
  label: string;
  variant: ButtonProps["variant"];
}) => {
  const handleClick = () => {
    console.log("clicked");
  };

  const buttonLabel = `${label} Button`;
  return (
    <>
      <div
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridTemplateRows: "auto",
          gridGap: 10,
        }}
      >
        <Button variant={variant} onClick={handleClick}>
          {buttonLabel}
        </Button>
        <Button variant={variant} onClick={handleClick}>
          <SearchIcon size={12} />
        </Button>
        <Button variant={variant} onClick={handleClick}>
          <SearchIcon size={12} />
          {` ${buttonLabel}`}
        </Button>
      </div>
      <br />
      <div>
        <Button variant={variant} onClick={handleClick} disabled>
          {`${buttonLabel} (disabled)`}
        </Button>
      </div>
    </>
  );
};

export const CTA: ComponentStory<typeof Button> = () => {
  return <ButtonGrid variant="cta" label="CTA" />;
};

export const Primary: ComponentStory<typeof Button> = () => {
  return <ButtonGrid variant="primary" label="Primary" />;
};

export const Secondary: ComponentStory<typeof Button> = () => {
  return <ButtonGrid variant="secondary" label="Secondary" />;
};

export const FeatureButton = SingleButtonTemplate.bind({});
FeatureButton.args = {
  children: "Feature Button",
};

export const FocusableWhenDisabled = SingleButtonTemplate.bind({});
FocusableWhenDisabled.args = {
  focusableWhenDisabled: true,
  disabled: true,
  children: "Focusable When Disabled",
};
