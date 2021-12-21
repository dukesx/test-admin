import { Group, Text } from "@mantine/core";
import { ListItemProps } from "../../types/globals";
import { useRouter } from "next/router";
const ListItem: React.FC<ListItemProps> = ({
  title,
  leading,
  trailing,
  description,
  path,
}) => {
  const router = useRouter();
  return (
    <Group
      className="hover:bg-gray-100 dark:hover:bg-zinc-800 py-2 px-3 cursor-pointer"
      mt={10}
      onClick={() => router.push(path)}
    >
      {leading}
      <Group spacing={1} direction="column">
        <Text size="sm">{title}</Text>
        <Text size="xs" color="gray">
          {description}
        </Text>
      </Group>
      {trailing}
    </Group>
  );
};

export default ListItem;
