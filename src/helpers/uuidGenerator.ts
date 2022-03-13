/**
 * Helper generate uid on custom uniq key array data
 * @returns uid
 */

export default function uid() {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(2);

  return head + tail;
}
