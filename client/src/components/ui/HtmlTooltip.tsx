import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "400px",
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default HtmlTooltip;
