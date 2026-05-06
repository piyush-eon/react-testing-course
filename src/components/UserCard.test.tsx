import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";
import { mockUser, mockUserMinimal } from "../test/mocks";
import { describe, expect, it } from "vitest";
import { formatNumber } from "../utils/formatNumber";

describe("UserCard", () => {
  it("renders name, login, bio and location", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.name!)).toBeInTheDocument();
    expect(screen.getByText(`@${mockUser.login}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio!)).toBeInTheDocument();
    expect(screen.getByText(mockUser.location!)).toBeInTheDocument();
  });

  it("renders follower and repo stats correctly", () => {
    render(<UserCard user={mockUser} />);

    // Assert using formatNumber so it always matches no matter what mock values you use
    expect(
      screen.getByText(formatNumber(mockUser.public_repos))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatNumber(mockUser.followers))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatNumber(mockUser.following))
    ).toBeInTheDocument();
  });

  it("does not render bio or location when they are null", () => {
    render(<UserCard user={mockUserMinimal} />);

    expect(screen.queryByText(/full stack/i)).not.toBeInTheDocument();
    expect(screen.queryByText("India")).not.toBeInTheDocument();
  });
});
