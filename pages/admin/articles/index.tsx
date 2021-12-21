import AdminWrapper from "../../../components/global/admin/wrapper";
import {
  Text,
  Grid,
  Col,
  Group,
  useMantineColorScheme,
  Tabs,
  Loader,
} from "@mantine/core";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { supabase } from "../../../lib/initSupabase";
import dynamic from "next/dynamic";
const ArticlesManager = () => {
  const { colorScheme } = useMantineColorScheme();
  const editorRef = useRef(null);
  let [rows, setRows] = useState();
  let [totalRows, setTotalRows] = useState(0);
  const GridTable = dynamic(() => import("@nadavshaar/react-grid-table"), {
    ssr: false,
    loading: () => <Loader />,
  });
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // const Username = ({
  //   tableManager,
  //   value,
  //   field,
  //   data,
  //   column,
  //   colIndex,
  //   rowIndex,
  // }) => {
  //   return (
  //     <div
  //       className="rgt-cell-inner"
  //       style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
  //     >
  //       <img src={data.avatar} alt="user avatar" />
  //       <span className="rgt-text-truncate" style={{ marginLeft: 10 }}>
  //         {value}
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <AdminWrapper>
      <Tabs variant="pills">
        <Tabs.Tab label="Articles List">
          <GridTable
            columns={[
              {
                id: 1,
                field: "id",
                label: "ID",
              },
              {
                id: 2,
                field: "title",
                label: "Article Title",
              },
            ]}
            rows={rows}
            onRowsRequest={async (requestData, tableManager) => {
              const { data, error } = await supabase.from("articles").select();

              if (error != null) {
                return;
              } else {
                return {
                  rows: data,
                  totalRows: data.length,
                };
              }
            }}
            onRowsChange={setRows}
            totalRows={totalRows}
            onTotalRowsChange={setTotalRows}
          />
        </Tabs.Tab>
        <Tabs.Tab label="Create an Article">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,

              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              link_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_class_list: [
                { title: "None", value: "" },
                { title: "Some class", value: "class-name" },
              ],
              importcss_append: true,
              file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === "file") {
                  callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === "image") {
                  callback("https://www.google.com/logos/google.jpg", {
                    alt: "My alt text",
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === "media") {
                  callback("movie.mp4", {
                    source2: "alt.ogg",
                    poster: "https://www.google.com/logos/google.jpg",
                  });
                }
              },
              templates: [
                {
                  title: "New Table",
                  description: "creates a new table",
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: "Starting my story",
                  description: "A cure for writers block",
                  content: "Once upon a time...",
                },
                {
                  title: "New list with dates",
                  description: "New List with dates",
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
              skin: colorScheme == "dark" ? "oxide-dark" : "oxide",
              content_css: colorScheme == "dark" ? "dark" : "default",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </AdminWrapper>
  );
};

export default ArticlesManager;
