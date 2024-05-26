import { FeedEntity } from "@/model/Feed";

export default function Home() {
  const exampleFeedEntity: FeedEntity = {
    feed: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        gotchaId: "0e25b7c1-51b3-47c8-b34e-7457d27b1a48",
        creationDate: new Date('2024-05-26T10:00:00Z'),
        userName: "John",
        userLastName: "Doe",
        userNickname: "jdoe",
        content: "This is a sample content for the gotcha.",
        qntdRepost: 5,
        isRepost: true,
        repostedGotcha: {
          id: "ccf5c9a1-b5c6-4de6-9931-0f30d69c5ef0",
          userId: "223e4567-e89b-12d3-a456-426614174111",
          gotchaId: "9e25b7c1-51b3-47c8-b34e-7457d27b1b48",
          creationDate: new Date('2024-04-25T08:00:00Z'),
          userName: "Jane",
          userLastName: "Smith",
          userNickname: "jsmith",
          content: "This is a sample content for the reposted gotcha.",
          qntdRepost: 5
        }
      },
      {
        id: "660e8400-e29b-41d4-a716-446655441111",
        userId: "223e4567-e89b-12d3-a456-426614175000",
        gotchaId: "1e25b7c1-51b3-47c8-b34e-7457d27b1b49",
        creationDate: new Date('2024-05-25T11:00:00Z'),
        userName: "Alice",
        userLastName: "Johnson",
        userNickname: "ajohnson",
        content: "Another example content for a different gotcha.",
        qntdRepost: 0,
        isRepost: false,
        repostedGotcha: undefined // No reposted gotcha
      }
    ]
  };


  return (
    <main>
      <div>Working on login page</div>
    </main>
  );
}
