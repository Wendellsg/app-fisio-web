import { useState, useEffect } from "react";
import PacienteAvatar from "../../src/components/PacienteAvatar";
import LoadingIcone from "../../src/components/LoadingIcone";
import { useRouter } from "next/router";
import { Box } from "../../src/components/atoms/layouts";
import { SearchInput } from "../../src/components/molecules/SearchInput";
import { AddButton } from "../../src/components/atoms/Buttons";
import { HilightedText } from "../../src/components/atoms/typograph";
export default function Pacientes() {
  const [searchInput, setSearchInput] = useState("");
  const [pacintes, setPaciente] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const fetchUser = () => {
    setIsloading(true);
    fetch(`https://dummyapi.io/data/v1/user?page=1&limit=30`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        "app-id": "62914bec48a5d307d256de44",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        setPaciente(user.data);
        setIsloading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      height="100%"
      gap="2rem"
    >
      <Box width="100%" alignItems="center" justifyContent="space-between">
        <HilightedText>Seus Pacientes</HilightedText>
        <Box>
          <SearchInput
            action={(e) => setSearchInput(e)}
            placeholder="Pesquisar Paciente..."
          />
          <AddButton onClick={() => router.push("/pacientes/novo")} />
        </Box>
      </Box>
      <Box width="100%" flexWrap="wrap" gap="1.5rem" margin="2rem 0" maxHeight="90vh" overflow="auto">
        {pacintes !== null ? (
          pacintes.map((pacinte, index) => {
            return (
              <PacienteAvatar
                key={pacinte.id}
                index={index}
                image={pacinte.picture}
                name={`${pacinte.firstName} ${pacinte.lastName}`}
                id={pacinte.id}
              />
            );
          })
        ) : isLoading ? (
          <LoadingIcone />
        ) : (
          <div>Nenhum Paciente encontrado</div>
        )}
      </Box>
    </Box>
  );
}
