import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RepoList from "./RepoList";
import { mockRepos } from "../test/mocks";

describe("RepoList", () => {
  it("renders the correct number of repos", () => {
    render(<RepoList repos={mockRepos} />);

    const repoLinks = screen.getAllByRole("link");
    expect(repoLinks).toHaveLength(mockRepos.length);
  });

  it("shows empty state message when repos array is empty", () => {
    render(<RepoList repos={[]} />);

    expect(
      screen.getByText(/no public repositories found/i),
    ).toBeInTheDocument();
  });
});
