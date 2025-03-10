import { createIcon } from "../icon/createIcon";

export const HiddenIcon = createIcon(
  <svg viewBox="0 0 12 12" data-testid="HiddenIcon">
    <path d="m10.576.5 1.061 1.061L9.768 3.43c1.03.812 1.791 1.793 2.232 2.445C11.25 7.25 9 10 6 10a5.317 5.317 0 0 1-2.272-.53l-2.167 2.167L.5 10.576 2.416 8.66C1.251 7.764.406 6.618 0 5.874c.875-1.292 3-3.875 6-3.875.908 0 1.736.237 2.474.603L10.577.499zM7.427 3.649a2.75 2.75 0 0 0-3.778 3.778l.741-.741a1.75 1.75 0 0 1 2.297-2.297l.741-.741zm-2.679 4.8a2.75 2.75 0 0 0 3.701-3.701l-.767.767a1.75 1.75 0 0 1-2.166 2.166l-.767.767z" />
  </svg>,
  "Hidden",
  "hidden"
);
