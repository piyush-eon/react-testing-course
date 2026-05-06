import { renderHook, act, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useGithubUser } from "./useGithubUser";
import { mockUser, mockRepos } from "../test/mocks";

describe("useGithubUser", () => {
  afterEach(() => vi.restoreAllMocks());

  it("starts with empty state", () => {
    const { result } = renderHook(() => useGithubUser());

    expect(result.current.user).toBeNull();
    expect(result.current.repos).toHaveLength(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets user and repos after a successful search", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUser),
      } as never)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockRepos),
      } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("piyush");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.login).toBe(mockUser.login);
    expect(result.current.repos).toHaveLength(mockRepos.length);
    expect(result.current.error).toBeNull();
  });

  it("sets an error message when user is not found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    } as never);

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("thisuserdoesnotexist");
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        'User "thisuserdoesnotexist" not found on GitHub.'
      );
    });

    expect(result.current.user).toBeNull();
  });

  it("sets an error message on network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useGithubUser());

    act(() => {
      result.current.searchUser("piyush");
    });

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Network error. Please check your connection."
      );
    });
  });
});
