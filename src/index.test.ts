import { describe, expect, test } from "vite-plus/test"
import app from "@/index"

describe("API", () => {
  test("reports its health", async () => {
    const response = await app.request("/")

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ msg: "ok" })
  })

  test("rejects invalid user input before accessing the database", async () => {
    const response = await app.request("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "invalid", name: "" }),
    })

    expect(response.status).toBe(400)
  })
})
