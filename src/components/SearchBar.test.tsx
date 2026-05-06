import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  it("renders the input and search button", () => {
    render(<SearchBar onSearch={vi.fn()} loading={false} />);

    // const { container } = render(
    //   <SearchBar onSearch={vi.fn()} loading={false} />
    // );
    // logRoles(container); // prints all available roles to the terminal

    expect(
      screen.getByRole("textbox", { name: /github username/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("updates the input when the user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={vi.fn()} loading={false} />);

    await user.type(
      screen.getByRole("textbox", { name: /github username/i }),
      "piyush"
    );

    expect(
      screen.getByRole("textbox", { name: /github username/i })
    ).toHaveValue("piyush");
  });

  it("calls onSearch with the typed username when form is submitted", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={onSearch} loading={false} />);

    await user.type(
      screen.getByRole("textbox", { name: /github username/i }),
      "piyush"
    );
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith("piyush");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("shows a validation error and does not call onSearch when input is empty", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={onSearch} loading={false} />);

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });
});
