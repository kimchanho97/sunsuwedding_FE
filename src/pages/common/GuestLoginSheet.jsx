import BottomSheet from "../../components/common/bottomsheet/BottomSheet";

const testAccounts = [
  {
    label: "김신랑 (예비 신랑신부, 순수멤버십O)",
    email: "couple1@sunsu.com",
    password: "qwer1234!",
  },
  {
    label: "유희정 (웨딩 플래너, 순수멤버십X)",
    email: "planner1@sunsu.com",
    password: "qwer1234!",
  },
];

export default function GuestLoginSheet({ isOpen, onClose, onSelectUser }) {
  if (!isOpen) return null;

  return (
    <BottomSheet onClose={onClose}>
      <div className="p-4">
        <h2 className="text-center font-semibold text-sm mb-4">
          테스트 계정을 선택하세요
        </h2>
        <ul className="flex flex-col gap-3">
          {testAccounts.map((account) => (
            <li key={account.email}>
              <button
                type="button"
                onClick={() => onSelectUser(account)}
                className="w-full text-left px-4 py-3 border rounded-lg text-sm bg-white hover:bg-zinc-100 transition"
              >
                {account.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
}
