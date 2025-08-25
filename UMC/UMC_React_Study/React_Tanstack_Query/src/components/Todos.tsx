import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("/api/todos");
  return res.json();
};

function TodosComponent() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
  });

  if (isLoading) return <div>로딩 중!</div>;
  if (error) return <div>에러입니다!</div>;

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodosComponent;
