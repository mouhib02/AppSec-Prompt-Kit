export function GuidedProgress({ completed, total }: { completed: number; total: number }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="guided-progress" aria-label={`${completed} of ${total} steps completed`}>
      <div>
        <span>Review progress</span>
        <strong>{completed} / {total} steps completed</strong>
      </div>
      <div className="guided-progress-track"><span style={{ width: `${percent}%` }} /></div>
      <b>{percent}%</b>
    </div>
  );
}
