import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RepoItem from "./RepoItem";
import { mockRepos } from "../test/mocks";

describe("RepoItem", () => {
  it("renders repo name, star count and language", () => {
    render(<RepoItem repo={mockRepos[0]} />);

    expect(screen.getByText(mockRepos[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(String(mockRepos[0].stargazers_count))
    ).toBeInTheDocument();
    expect(screen.getByText(mockRepos[0].language!)).toBeInTheDocument();
  });

  it("shows fallback text when description is null", () => {
    render(<RepoItem repo={mockRepos[1]} />);

    expect(screen.getByText(/no description provided/i)).toBeInTheDocument();
  });

  it("does not render language badge when language is null", () => {
    render(<RepoItem repo={mockRepos[1]} />);

    expect(
      screen.queryByText(/typescript|javascript/i)
    ).not.toBeInTheDocument();
  });
});
