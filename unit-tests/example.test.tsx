/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Table from "../src/components/table";

describe("Table component", () => {
  test("Has the header row", () => {
    // Hay un problema rarísimo con el método render y typescript. Lo está interpretando como
    // un valor ahí y no como un componente de React.FC.
    const tableHeaders = ["Columna1", "Columna2", "Columna3"];
    render(<Table tableHeaders={tableHeaders}>{<div>dummy</div>}</Table>);
    expect(screen.getByText("Columna1"));
  });
});
