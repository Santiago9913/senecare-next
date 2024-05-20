import Image from "next/image";

export default function LogInIconButton() {
  return (
    <div>
      <Image
        priority
        src="/seneca-logo.svg"
        height={16}
        width={16}
        alt="Seneca Logo"
      />
    </div>
  );
}
