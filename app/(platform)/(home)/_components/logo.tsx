import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  height = 30,
  width = 30,
  className,
}: {
  height: number;
  width: number;
  className?: string;
}) => {
  return (
    <Link href="/">
      <div className="cursor-pointer duration-200 hover:scale-110 hover:opacity-75">
        <Image
          src="/cool-stuff-for-kid.jpeg"
          alt="logo"
          height={height}
          width={width}
          className={cn("", className)}
        />
      </div>
      {/* <div
        className="size-40"
        style={{
          backgroundImage: "url(/kid-stuff-mall.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
        }}
      ></div> */}
    </Link>
  );
};
