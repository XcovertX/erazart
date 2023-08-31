import { SVGProps } from "react";


type CaretIconProps = {
 height?: number;
 width?: number;
 "aria-label"?: string;
 className?: string;
} & SVGProps<SVGSVGElement>;


const CaretIcon = ({
 height = 80,
 width = 80,
 "aria-label": ariaLabel,
 className,
 ...props
}: CaretIconProps) => (
 <svg
   aria-label={ariaLabel}
   xmlns="http://www.w3.org/2000/svg"
   width={width}
   height={height}
   fill="none"
   viewBox="0 0 24 24"
   className={className}
   {...props}
 >
   <path
     fill="#f4f4f5"
     d="M5.161 10.073C4.454 9.265 5.028 8 6.101 8h11.797c1.074 0 1.648 1.265.94 2.073l-5.521 6.31a1.75 1.75 0 0 1-2.634 0l-5.522-6.31ZM6.653 9.5l5.159 5.896a.25.25 0 0 0 .376 0l5.16-5.896H6.652Z"
   />
 </svg>
);
export { CaretIcon };