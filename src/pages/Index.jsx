import { Box, Button, Checkbox, Flex, Heading, IconButton, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const bg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box p={5} bg={bg}>
      <Heading mb={4} textAlign="center">
        TODO LIST
      </Heading>
      <Flex mb={4} justify="center">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" size="md" mr={2} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddTask}>
          Add Task
        </Button>
      </Flex>
      <Stack spacing={3}>
        {tasks.map((task) => (
          <Flex key={task.id} p={3} bg="white" borderRadius="md" alignItems="center" justifyContent="space-between">
            <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(task.id)}>
              <Text as={task.completed ? "del" : undefined}>{task.text}</Text>
            </Checkbox>
            <Box>
              <IconButton icon={<FaEdit />} aria-label="Edit task" mr={2} />
              <IconButton icon={<FaTrash />} aria-label="Delete task" colorScheme="red" onClick={() => handleDeleteTask(task.id)} />
            </Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Index;
