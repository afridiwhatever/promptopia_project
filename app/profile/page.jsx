"use client";

import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const returnTo = usePathname();

  const updatePromptList = (deletedPromptId) => {
    const filteredPrompts = prompts.filter(
      (item) => item._id !== deletedPromptId
    );
    setPrompts(filteredPrompts);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);

      const data = await response.json();

      setPrompts(data);
    }
    if (session?.user.id) {
      fetchData();
    }
  }, [session?.user.id]);

  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personal profile"
        prompts={prompts}
        updatePromptList={updatePromptList}
        returnTo={returnTo}
      />
    </>
  );
};

export default ProfilePage;
