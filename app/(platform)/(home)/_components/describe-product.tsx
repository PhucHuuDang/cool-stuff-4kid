"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export const DescribeProduct = () => {
  const MAX_LENGTH_DESCRIPTION = 150;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const description = `
  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
  Doloremque quo, consectetur deleniti aliquam iste magnam. Sequi
  cupiditate placeat aspernatur quod sit minus, cumque quis quisquam
  quo natus id consequuntur laudantium. lorem, cumque quis quisquam
  quo natus id consequuntur laudantium. lorem,
  
  `;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết sản phẩm</CardTitle>

        <Collapsible className="space-y-2">
          <CardDescription>
            {description.length > MAX_LENGTH_DESCRIPTION
              ? isCollapsed
                ? description
                : description.slice(0, MAX_LENGTH_DESCRIPTION) + "..."
              : description}
          </CardDescription>

          <CollapsibleContent>
            <div>{description}</div>
          </CollapsibleContent>
          <div className="w-auto text-center">
            <CollapsibleTrigger asChild className="w-full">
              <Button
                className="h-12 w-72 bg-sky-500 duration-200 hover:bg-sky-700"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {!isCollapsed ? "Xem thêm" : "Thu gọn"}
                {/* Xem thêm */}
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </CardHeader>
    </Card>
  );
};
