import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/gif";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            "https://imgs.search.brave.com/U98BNtrxUlWbaGtD7M6nfpjqYXfFVKv6vAoFMkHLV4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jaGFp/LTI5NjY1NzgzNi5q/cGc"
          }
          alt="favicon"
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
