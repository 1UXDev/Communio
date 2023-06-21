import Layout from "@/components/Layout/Layout";
import AppSettings from "@/components/AppSettings/AppSettings";

export default function Home({ usersData }) {
  return (
    <>
      <AppSettings usersDataBackup={usersData}></AppSettings>
      <Layout></Layout>
    </>
  );
}
