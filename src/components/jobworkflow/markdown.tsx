import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components = {
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <pre
          {...props}
          className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2 dark:bg-zinc-800`}
        >
          <code className={match[1]}>{children}</code>
        </pre>
      ) : (
        <code
          className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
          {...props}
        >
          {children}
        </code>
      );
    },
    ol: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
    }) => (
      <ol className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
    }) => (
      <li className="py-1" {...props}>
        {children}
      </li>
    ),
    ul: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
    }) => (
      <ul className="list-decimal list-outside ml-4" {...props}>
        {children}
      </ul>
    ),
    strong: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
    }) => (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    ),
    a: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      href?: string;
      target?: string;
      rel?: string;
    }) => (
      <a
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);