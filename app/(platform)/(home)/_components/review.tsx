import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Review = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hỏi đáp</CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        <div className="flex gap-x-2">
          <Avatar className="size-12">
            <AvatarImage className="" src="/images/tiny-home.webp" />
            <AvatarFallback />
          </Avatar>

          <div className="flex w-auto flex-col gap-x-2">
            <h2 className="text-lg font-bold">Harry Dang</h2>
            <Card>
              <CardContent className="rounded-lg bg-slate-400/50 p-2 text-black">
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
                San pham nay co chat luong tot khong? San pham nay co chat luong
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
