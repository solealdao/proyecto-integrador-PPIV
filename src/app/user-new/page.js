"use client";

import PageLayout from "@/components/PageLayout";
import styled from "@emotion/styled";
import theme from "@/app/theme";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background-color: ${theme.colors.darkGreen};
  color: ${theme.colors.yellow};
  padding: 12px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  font-family: Mulish, sans-serif;
`;
const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 250px;
  margin-top: 8px;
  font-family: Mulish, sans-serif;
`;


export default function UserNew() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación: podrías hacer POST a una API real acá
    console.log("Usuario nuevo:", { name, email });

    // Redirige a gestión de usuarios
    router.push("/user-management");
  };

  return (
    <PageLayout
      showImage={true}
      imageUrl="/user.svg"
      title="Nuevo Usuario"
      showClock={true}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nombre completo</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Tipo de usuario</Label>
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccionar tipo
            </option>
            <option value="doctor">Doctor</option>
            <option value="paciente">Paciente</option>
            <option value="admin">Administrador</option>
          </Select>
        </FormGroup>

        <ButtonContainer>
          <ActionButton
            type="button"
            onClick={() => router.push("/user-management")}
          >
            Cancelar
          </ActionButton>
          <ActionButton type="submit">Guardar</ActionButton>
        </ButtonContainer>
      </Form>
    </PageLayout>
  );
}
