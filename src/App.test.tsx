import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const user = userEvent.setup();

beforeEach(() => {
  render(<App />);
});

describe("Comment CRUD", () => {
  it("renders", async () => {
    const foundUsername = await screen.findByText(/juliusomo/i);
    expect(foundUsername).toBeVisible();
  });

  it("should display modal when delete is clicked", async () => {
    const deleteButtons = await screen.findAllByText(/Delete/i);
    await user.click(deleteButtons[0]);

    const foundModal = await screen.findByRole("dialog");
    const foundTitle = within(foundModal).getByText("Delete comment");

    expect(foundTitle).toBeVisible();
  });

  it("should successfully add a comment", async () => {
    await user.type(screen.getByPlaceholderText("Add a comment..."), "comment");
    await user.click(screen.getByText("Send"));

    const foundComment = await screen.findByText("comment");

    expect(foundComment).toBeVisible();
  });

  it("should successfully delete comment", async () => {
    const deleteButtons = await screen.findAllByText(/Delete/i);
    await user.click(deleteButtons[0]);

    const foundModal = await screen.findByRole("dialog");
    const confirmDeleteButton = within(foundModal).getByText(/Yes, delete/i);

    await user.click(confirmDeleteButton);

    await waitFor(() => {
      expect(
        screen.queryByText(
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        ),
      ).toBeNull();
    });
  });

  it("should successfully edit comments", async () => {
    const editButtons = await screen.findAllByText(/Edit/i);
    const parentPost = editButtons[0].closest("li")!;

    await user.click(editButtons[0]);
    const textarea = within(parentPost).getByRole("textbox");
    await user.clear(textarea);
    await user.type(textarea, "test");
    await user.click(screen.getByText(/Update/i));

    const foundComment = await screen.findByText("test");

    expect(foundComment).toBeVisible();
  });
});

describe("Comment score", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should increase score when clicking plus", async () => {
    const selectedCommentChild = await screen.findByText(/amyrobson/i);
    const selectedComment = selectedCommentChild.closest("li")!;
    const plusButton = within(selectedComment).getAllByLabelText("Upvote")[0];
    const previousScoreElement =
      within(selectedComment).getAllByLabelText("Comment Score")[0];
    const previousScoreValue = Number(previousScoreElement.textContent);

    await user.click(plusButton);

    await waitFor(() => {
      const nextScoreElement =
        within(selectedComment).getAllByLabelText("Comment Score")[0];
      expect(Number(nextScoreElement.textContent)).toBe(previousScoreValue + 1);
    });
  });

  it("should decrease score when clicking minus", async () => {
    const selectedCommentChild = await screen.findByText(/amyrobson/i);
    const selectedComment = selectedCommentChild.closest("li")!;
    const minusButton =
      within(selectedComment).getAllByLabelText("Downvote")[0];
    const previousScoreElement =
      within(selectedComment).getAllByLabelText("Comment Score")[0];
    const previousScoreValue = Number(previousScoreElement.textContent);

    await user.click(minusButton);

    await waitFor(() => {
      const nextScoreElement =
        within(selectedComment).getAllByLabelText("Comment Score")[0];
      expect(Number(nextScoreElement.textContent)).toBe(previousScoreValue - 1);
    });
  });
});
