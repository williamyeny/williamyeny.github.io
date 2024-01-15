import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto p-8 max-w-xl w-full items-center">
      <h1 className="text-xl mt-32">Will Ye</h1>
      <div className="text-sm mb-32">williamyeny at gmail dot com</div>
      <div className="text-sm">
        <ul className="list-disc list-inside">
          <li>
            <a
              className="text-blue-600"
              href="https://www.linkedin.com/in/will-ye-/"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a className="text-blue-600" href="https://github.com/williamyeny/">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
