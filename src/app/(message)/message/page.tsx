import { MessageUserList } from "@/components/chat";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import fetch from "node-fetch";

const getUserList = async (): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/broadcast/user/message/list`,
    {
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    }
  );
  return res.json();
};

export default async function Page({ params }: { params: { slug: number } }) {
  const userList = await getUserList();

  return (
    <>
      <Box
        component={"section"}
        sx={{ maxWidth: "1400px", width: "100%", margin: "20px auto" }}
      >
        <MessageUserList userList={userList.data} />
      </Box>
    </>
  );
}
