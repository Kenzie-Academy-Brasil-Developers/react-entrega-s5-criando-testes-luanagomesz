import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  wait,
} from "@testing-library/react";
import Search from "../../components/Search";
import { act } from "react-dom/test-utils";
import api from "../../services/index";
import userEvent from "@testing-library/user-event";
import { isJsxText } from "typescript";
import axios from "axios";
import Providers from "../../providers";
import App from "../../App";
import MockAdapter from "axios-mock-adapter";
describe("Search Components", () => {
  test("should be able to render an input", () => {
    render(<Search />);

    expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy();
  });

  test("should be able to render an button", () => {
    render(<Search />);

    expect(screen.getByText("Buscar pelo CEP")).toBeTruthy();
  });
});

const mockApi = new MockAdapter(api);

describe("Search funcionality", () => {
  test("should be able to render the searched adress", async () => {
    const result = {
      bairro: "Centro",
      cep: "88010000",
      cidade: "Florianópolis",
      cidade_info: { area_km2: "675,409", codigo_ibge: "4205407" },
      complemento: "até 348/349",
      estado: "SC",
      estado_info: {
        area_km2: "95.737,895",
        codigo_ibge: "42",
        nome: "Santa Catarina",
      },
      logradouro: "Rua Felipe Schmidt",
    };
    mockApi.onGet("88010000").replyOnce(200, result);

    render(
      <Providers>
        <App />
      </Providers>
    );

    const userInput = screen.getByPlaceholderText("Insira o CEP");
    const button = screen.getByText("Buscar pelo CEP");

    fireEvent.change(userInput, { target: { value: 88010000 } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Rua Felipe Schmidt")).toBeTruthy();
    });
  });
});
