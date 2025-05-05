import { FC, ReactNode } from "react";
import { css } from "@emotion/react";

const pageLayoutCss = css`
  width: 100vw;
  height: max-content;
  position: relative;
`;

type Props = { children: ReactNode };

export const Layout: FC<Props> = ({ children }) => (
  <div css={pageLayoutCss}>{children}</div>
);
